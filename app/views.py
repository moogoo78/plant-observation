from django.shortcuts import render
from django.views import generic

from app.models import Event

class EventIndexView(generic.ListView):
    model = Event
    template_name = 'event-list.html'

    context_object_name = 'event_list'

    def get_queryset(self):
        """Return the last five published questions."""
        return Event.objects.all()


class EventView(generic.DetailView):
    model = Event
    template_name = 'event-detail.html'
