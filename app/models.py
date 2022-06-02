from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=1000)
    datetime_start = models.DateField('調查日期', null=True, blank=True)
    datetime_end = models.DateField('調查日期-結束', null=True, blank=True)
    # pia
    # members

class Project(models.Model):
    name = models.CharField(max_length=1000)

class Person(models.Model):
    name = models.CharField(max_length=1000)

class Location(models.Model):
    name = models.CharField(max_length=1000)

class Tree(models.Model):
    name = models.CharField(max_length=1000)

class MeasurementOrFactParameterCategory(models.Model):
    name = models.CharField(max_length=1000)

class MeasurementOrFactParameter(models.Model):
    name = models.CharField(max_length=1000)
    label = models.CharField(max_length=1000)
    seq = models.PositiveSmallIntegerField(default=1)

class MeasurementOrFact(models.Model):
    name = models.CharField(max_length=1000)
# species
