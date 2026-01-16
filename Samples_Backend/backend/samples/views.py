# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .data import SAMPLES, SUBMISSIONS

def get_sample(request, sample_id):
    sample = SAMPLES.get(sample_id)
    if sample:
        return JsonResponse(sample)
    return JsonResponse({"error": "Sample NOT Found"}, status=404)

@csrf_exempt
def submit_sample(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    sample_id = data.get("sample_id")
    collection_date = data.get("collection_date")
    notes = data.get("notes", "")

    if not sample_id or sample_id not in SAMPLES:
        return JsonResponse({"error": "Invalid sample_id"}, status=400)
    if not collection_date:
        return JsonResponse({"error": "collection_date is required"}, status=400)

    SUBMISSIONS[sample_id] = {"collection_date": collection_date, "notes": notes}
    return JsonResponse({"message": "Submission recorded"})
