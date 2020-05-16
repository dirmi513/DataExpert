import json
import boto3 
import os 

# Lambda execution user credentials 
lambda_client = boto3.client('lambda', \
                            region_name='us-east-1', \
                            aws_access_key_id=os.environ['DATAEXPERT_LAMBDA_EXECUTOR_AWS_ACCESS_KEY'], \
                            aws_secret_access_key= os.environ['DATAEXPERT_LAMBDA_EXECUTOR_AWS_SECRET_KEY'])


def execute(code, grade_code, _cls, submit_correct_answer): 
    """
    """
    event = {
        'code': code,
        'grade': grade_code,
        'cls': _cls,
        'submit_correct_answer': submit_correct_answer 
    } 
    try: 
        response = lambda_client.invoke(
            FunctionName= "user-code-executor-dev-code_executor",
            InvocationType='RequestResponse',
            LogType='Tail',
            Payload=json.dumps(event)
        )  
        data = response['Payload'].read() 
        return data
    except Exception as e:   
        return e 
