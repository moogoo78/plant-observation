# from django.shortcuts import (
#    render,
# )

from django.http import (
    HttpResponse,
    JsonResponse,
)
from django.views.decorators.csrf import csrf_exempt

from app.models import (
    Project,
    Person,
    Plant,
    Location,
    MeasurementOrFactParameterCategory,
)

@csrf_exempt
def get_event_options(request):
    mof = []
    cats = MeasurementOrFactParameterCategory.objects.all()
    for c in cats:
        mof.append({
            'id': c.id,
            'name': c.name,
            'label': c.label,
            'choices': [{
                'name': p.name,
                'label': p.label,
                'id': p.id
            } for p in c.measurementorfactparameter_set.all()]
        })

    return JsonResponse({
        'mof': mof,
        'person': [{
            'id': x.id,
            'name': x.name
        } for x in Person.objects.all()],
        'project': [{
            'id': x.id,
            'name': x.name
        } for x in Project.objects.all()],
        'location': [{
            'id': x.id,
            'name': x.name
        } for x in Location.objects.all()],
        'plant': [{
            'id': x.id,
            'name': x.name,
        } for x in Plant.objects.all()]
    })
