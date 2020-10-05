from django.shortcuts import render, redirect
from .forms import StoreForm
from django.http import JsonResponse
from .models import Store
from django.urls import reverse
from store.api.serializers import StoreSerializer
from rest_framework import viewsets

def index(request):
    if request.user.is_authenticated and request.user.group == 2:
        try:
            store = Store.objects.get(user_id=request.user.id)
        except Store.DoesNotExist:
            store = None
        #raise Exception(store)
        data = {
            'store' : store
        }
        return render(request, 'store/index.html', data)
    else:
        return redirect('/')

def create_store(request):
    if request.user.is_authenticated and request.user.group == 2:
        current_user_id = int(request.user.id)
        try:
            store_exists = Store.objects.get(user_id=current_user_id)
        except Store.DoesNotExist:
            store_exists = None
        # Allow user to create store only if not created before
        if store_exists is None:
            if request.method == "POST":
                form = StoreForm(request.POST, request.FILES)
                if form.is_valid():

                    if store_exists:
                        data = {
                            'is_valid': False,
                            'msg': 'store already added'
                        }
                    else:
                        store = form.save(commit=False)
                        store.user_id = current_user_id
                        #raise Exception(User.objects.get(pk=user_id))
                        #store.pan_uploads = request.FILES['pan_uploads']
                        store.save()
                        data = {
                            'is_valid': True,
                            'store': store.id
                        }
                    return JsonResponse(data)
                else:
                    data = {
                        'is_valid': False,
                        'errors': form.errors
                    }
                    return JsonResponse(data)
            else:
                form = StoreForm()
                context = {
                    'form': form
                }

                return render(request, 'store/create.html', context)
        else:
            return reverse('store:index')
    else:
        return redirect('/')

class StoreViewset(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer


# class StoreAPI(viewsets.ViewSet):
    
#     def create(self, request):
#         store_name = request.data.get("store_name", None)
#         pan = request.data.get("pan", None)
#         phone = request.data.get("phone", None)
#         location = request.data.get("location", None)
#         available_items = request.data.get("available_items", None)
#         description = request.data.get("description", None)
#         keywords = request.data.get("keywords", None)

#         data = {
#                 'is_valid': False,
#                 'errors': store_name
#         }
#         return JsonResponse(data)
        
        
