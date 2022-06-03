from django.contrib import admin

from .models import (
    Project,
    Plant,
    Species,
    Event,
    Person,
    Location,
    MeasurementOrFactParameter,
    MeasurementOrFactParameterCategory,
)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    model = Project


@admin.register(Person)
class ProjectAdmin(admin.ModelAdmin):
    model = Person


@admin.register(Event)
class ProjectAdmin(admin.ModelAdmin):
    model = Event


@admin.register(Location)
class ProjectAdmin(admin.ModelAdmin):
    model = Location


@admin.register(Plant)
class ProjectAdmin(admin.ModelAdmin):
    model = Plant


@admin.register(Species)
class ProjectAdmin(admin.ModelAdmin):
    model = Species


@admin.register(MeasurementOrFactParameter)
class ProjectAdmin(admin.ModelAdmin):
    model = MeasurementOrFactParameter


@admin.register(MeasurementOrFactParameterCategory)
class ProjectAdmin(admin.ModelAdmin):
    model = MeasurementOrFactParameterCategory
