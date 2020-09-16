import logging
import sys

# Global logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)
handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.INFO)
handler.setFormatter(logging.Formatter('%(asctime)s.%(msecs)d %(name)s %(levelname)s %(message)s', '%Y-%m-%d %H:%M:%S'))
logger.addHandler(handler)
