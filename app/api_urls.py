from django.urls import path
from . import (
    api_views
)

urlpatterns = [
    path('event-options', api_views.get_event_options, name='api-get-event-options'),
    path('observations', api_views.observations, name='api-observations'),
]
