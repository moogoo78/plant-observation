# from django.shortcuts import (
#    render,
# )
import json

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
    MeasurementOrFactParameter,
    MeasurementOrFact,
    Event,
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
            'description': c.description,
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
            'label': x.label,
        } for x in Plant.objects.all()]
    })


@csrf_exempt
def observations(request):
    ret = {'message': ''}
    if request.method == 'POST':
        data = json.loads(request.body)
        e = Event(
            datetime_start=data.get('date')[:10],
        )
        if x := data.get('location'):
            e.location_id = x['id']
        if x := data.get('project'):
            e.project_id = x['id']
        if principle := data.get('principle'):
            e.principle_id = x['id']

        e.save()

        for i in data['observations']:
            mof = MeasurementOrFact(plant_id=i['plant']['id'])
            mof.save()
            if x := i.get('remarks'):
                mof.remarks = x
            for j in i['checked']:
                keys = j.split('__')
                p = MeasurementOrFactParameter.objects.filter(name=keys[1]).first()
                mof.parameters.add(p);

    return JsonResponse(ret)
