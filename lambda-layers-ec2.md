This will walk through creating an AWS Lambda layer from within an EC2 instance, which was inspired by 
[this](https://medium.com/@lucashenriquessilva/how-to-create-a-aws-lambda-python-layer-db2830e08b12) article.

1)SSH into the EC2 instance.

`ssh -i "lambda-layers.pem" ec2-user@ec2-3-82-121-189.compute-1.amazonaws.com`

2)Set up your AWS credentials in the EC2 instance if this is the first time using the instance for this purpose.

    aws configure set aws_access_key_id <MY_ACCESS_KEY>;
    aws configure set aws_secret_access_key <MY_SECRET_ACCESS_KEY>;
    aws configure set default.region <MY_REGION>;

3)Install dev-tools, libs and Python.

    sudo yum -y update
    sudo yum -y upgrade
    sudo yum -y groupinstall 'Development Tools'
    sudo yum -y install python36
    pip install awscli --upgrade --user

4)Define pertinent AWS environment variables.

    export S3_BUCKET="NAME_OF_BUCKET"
    export S3_KEY="NAME_OF_KEY"
    export S3_PATH="s3://$S3_BUCKET/$S3_KEY"
    export LAYER_NAME="NAME_OF_LAYER"

For example : 

    export S3_BUCKET="dataexpert.correct.answers"
    export S3_KEY="lambda-layer"
    export S3_PATH="s3://$S3_BUCKET/$S3_KEY"
    export LAYER_NAME="dataexpert-layer"

5)Set up the virtual environment and install all of the layer dependencies within the virtual environment.

    virtualenv -p python3 ~/base_pkg/base_pkg
    source ~/base_pkg/base_pkg/bin/activate
    # For each depencency: 
    sudo $VIRTUAL_ENV/bin/pip install name-of-library 

For example: 

    virtualenv -p python3 ~/base_pkg/base_pkg
    source ~/base_pkg/base_pkg/bin/activate
    sudo $VIRTUAL_ENV/bin/pip install numpy
    sudo $VIRTUAL_ENV/bin/pip install pandas
    sudo $VIRTUAL_ENV/bin/pip install requests
    sudo $VIRTUAL_ENV/bin/pip install lxml
    sudo $VIRTUAL_ENV/bin/pip install boto3
    
6)Remove unnecessary packages (pip, wheel, setuptools) and pyc files. Then zip it all up and create the `base_pkg.zip
` file specified by Amazon (within a python folder).
    
    rsync -a --prune-empty-dirs $VIRTUAL_ENV/lib*/python*/site-packages/ ~/base_pkg/python/
    pushd ~/base_pkg/
    zip -r -9 -q ~/base_pkg/base_pkg.zip . -x \*.pyc ./python/pip\* ./python/setuptools\* ./python/wheel\* ./base_pkg\*
    popd
    
7)Upload the package to the S3 bucket and publish the Lambda layer.
    
    aws s3 cp ~/base_pkg/base_pkg.zip $S3_PATH
    aws lambda publish-layer-version --layer-name $LAYER_NAME --content S3Bucket=$S3_BUCKET,S3Key=$S3_KEY --compatible-runtimes python3.6