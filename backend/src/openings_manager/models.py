from django.db import models
from django.conf import settings
from django.db.models import JSONField


class Openings(models.Model):
    class Meta:
        verbose_name_plural = "Openings"
    name = models.CharField(max_length=255)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    positions = JSONField()
    def __str__(self):
        return self.name