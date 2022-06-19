from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=1000)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '人員'
        verbose_name_plural = '人員 '


class Project(models.Model):
    name = models.CharField(max_length=1000)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '計劃'
        verbose_name_plural = '計劃'


class Location(models.Model):
    name = models.CharField(max_length=1000)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '地點'
        verbose_name_plural = '地點'


class Event(models.Model):
    name = models.CharField(max_length=1000)
    datetime_start = models.DateField('調查日期', null=True, blank=True)
    datetime_end = models.DateField('調查日期-結束', null=True, blank=True)
    members = models.ManyToManyField(Person, verbose_name="list of sites", related_name='event_members')
    principle = models.ForeignKey(Person, on_delete=models.SET_NULL, null=True, blank=True, related_name='event_principle')
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        verbose_name = '調查活動'
        verbose_name_plural = '調查活動'


class Plant(models.Model):
    name = models.CharField(max_length=1000)
    label = models.CharField(max_length=1000, null=True)
    species = models.ForeignKey('Species', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '植物編號'
        verbose_name_plural = '植物編號'

class MeasurementOrFactParameterCategory(models.Model):
    name = models.CharField(max_length=1000)
    label = models.CharField(max_length=1000, null=True)
    seq = models.PositiveSmallIntegerField(default=1)
    description = models.CharField(max_length=1000, null=True, blank=True)

    def __str__(self):
        return f'{self.label} ({self.name})'

    class Meta:
        ordering = ['seq']
        verbose_name = '紀錄參數分類'
        verbose_name_plural = '紀錄參數分類'

class MeasurementOrFactParameter(models.Model):
    name = models.CharField(max_length=1000)
    label = models.CharField(max_length=1000)
    seq = models.PositiveSmallIntegerField(default=1)
    category = models.ForeignKey(MeasurementOrFactParameterCategory, on_delete=models.SET_NULL, null=True)

    def __str__(self):

        return f'{self.category.label} {self.name}-{self.label}'

    class Meta:
        ordering = ['category__seq', 'seq']
        verbose_name = '紀錄參數'
        verbose_name_plural = '紀錄參數'


class MeasurementOrFact(models.Model):
    event = models.ForeignKey(Event, on_delete=models.SET_NULL, null=True, blank=True, related_name='measurement_or_facts')
    remarks = models.TextField(null=True)
    plant = models.ForeignKey(Plant, on_delete=models.SET_NULL, null=True, blank=True)
    parameters = models.ManyToManyField(MeasurementOrFactParameter, verbose_name='parameters')

    class Meta:
        verbose_name = '紀錄內容'
        verbose_name_plural = '紀錄內容'


class Species(models.Model):
    scientific_name = models.CharField(max_length=1000)
    common_name = models.CharField(max_length=1000, null=True)

    def __str__(self):
        return self.scientific_name

    class Meta:
        verbose_name = '物種'
        verbose_name_plural = '物種'
