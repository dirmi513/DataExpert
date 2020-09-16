import json
import boto3 
import os 

# boto3 lambda client
lambda_client = boto3.client('lambda',
                             region_name='us-east-1',
                             aws_access_key_id=os.environ['DATAEXPERT_LAMBDA_INVOKER_AWS_ACCESS_KEY'],
                             aws_secret_access_key=os.environ['DATAEXPERT_LAMBDA_INVOKER_AWS_SECRET_KEY'])


def invoke_lambda(code, grade_code, _cls, submit_correct_answer, env):
    """Invokes the user-code-executor-{environment}-code_executor AWS Lambda Function.

    Args:
        code: User's Python code that needs to be executed in a containerized environment.
        grade_code: Did the user click Execute Code, or Submit Answer?
        _cls: Unique CourseLessonSlide identifier.
        submit_correct_answer: If this is the correct answer for a slide, and I want the
            results of the correct answer to be uploaded to the appropriate S3 bucket, which
            will later be used to grade student's code.
        env: dev/test/prod

    Returns:
        Results of executing the user's code.
    """
    event = {
        'code': code,
        'grade': grade_code,
        'cls': _cls,
        'submit_correct_answer': submit_correct_answer 
    } 
    try: 
        response = lambda_client.invoke(
            FunctionName=f'user-code-executor-{env}-code_executor',
            InvocationType='RequestResponse',
            LogType='Tail',
            Payload=json.dumps(event)
        )  
        response_data = response['Payload'].read()
        return response_data
    except Exception as e:   
        return e 
