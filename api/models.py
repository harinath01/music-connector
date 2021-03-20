from django.db import models
import string
import random

def unique_code_genarator():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase,k=length))
        if Room.objects.filter(code=code).count() == 0:
            break
    
    return code

# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=8, unique=True, default=unique_code_genarator)
    host = models.CharField(max_length=50, unique=True,default="")
    guest_can_pause = models.BooleanField(default=False, null=False)
    votes_to_skip=models.IntegerField(null=0,default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    current_song = models.CharField(max_length=50, null=True)
    
    def __str__():
        return Room.host

