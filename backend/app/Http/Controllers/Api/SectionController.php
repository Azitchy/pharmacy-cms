<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SectionController extends Controller
{
    public function publicIndex(): JsonResponse
    {
        return response()->json([
            'data' => $this->formatSections(
                SiteSection::query()->active()->orderBy('sort_order')->orderBy('id')->get()
            ),
        ]);
    }

    public function publicShow(SiteSection $siteSection): JsonResponse
    {
        if (! $siteSection->is_active) {
            return response()->json(['message' => 'Section not found.'], 404);
        }

        return response()->json([
            'data' => $this->formatSection($siteSection),
        ]);
    }

    public function index(): JsonResponse
    {
        return response()->json([
            'data' => $this->formatSections(
                SiteSection::query()->orderBy('sort_order')->orderBy('id')->get()
            ),
        ]);
    }

    public function show(SiteSection $siteSection): JsonResponse
    {
        return response()->json([
            'data' => $this->formatSection($siteSection),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $this->validateSection($request);

        $section = SiteSection::query()->create($validated);

        return response()->json([
            'message' => 'Section created successfully.',
            'data' => $this->formatSection($section),
        ], 201);
    }

    public function update(Request $request, SiteSection $siteSection): JsonResponse
    {
        $validated = $this->validateSection($request, $siteSection->id);

        $siteSection->update($validated);

        return response()->json([
            'message' => 'Section updated successfully.',
            'data' => $this->formatSection($siteSection->fresh()),
        ]);
    }

    public function destroy(SiteSection $siteSection): JsonResponse
    {
        $siteSection->delete();

        return response()->json([
            'message' => 'Section deleted successfully.',
        ]);
    }

    protected function validateSection(Request $request, ?int $ignoreId = null): array
    {
        $validated = $request->validate([
            'key' => [
                'required',
                'string',
                'max:120',
                Rule::unique('site_sections', 'key')->ignore($ignoreId),
            ],
            'label' => ['required', 'string', 'max:150'],
            'description' => ['nullable', 'string'],
            'section_type' => ['required', 'string', 'max:100'],
            'sort_order' => ['nullable', 'integer'],
            'is_active' => ['boolean'],
            'data' => ['required', 'array'],
        ]);

        $validated['sort_order'] = $validated['sort_order'] ?? 0;
        $validated['is_active'] = $validated['is_active'] ?? true;

        return $validated;
    }

    protected function formatSections($sections): array
    {
        return $sections->map(fn (SiteSection $section): array => $this->formatSection($section))->all();
    }

    protected function formatSection(SiteSection $section): array
    {
        return [
            'id' => $section->id,
            'key' => $section->key,
            'label' => $section->label,
            'description' => $section->description,
            'section_type' => $section->section_type,
            'is_active' => $section->is_active,
            'sort_order' => $section->sort_order,
            'data' => $section->data,
            'created_at' => $section->created_at?->toIso8601String(),
            'updated_at' => $section->updated_at?->toIso8601String(),
        ];
    }
}

