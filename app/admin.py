from django.contrib import admin

from .models import (
    Project,
    Tree,
)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    model = Project

@admin.register(Tree)
class ProjectAdmin(admin.ModelAdmin):
    model = Tree
