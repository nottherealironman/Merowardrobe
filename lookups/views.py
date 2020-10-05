from django.shortcuts import render
from .models import District
from django.http import JsonResponse

def load_districts(request):
    state_id = request.GET.get('stateId')
    dist = District.objects.filter(state_id=state_id).order_by('name')
    districts = {}
    for d in dist:
        districts[d.id] = d.name

    data = {
        'district': districts
    }
    return JsonResponse(data)