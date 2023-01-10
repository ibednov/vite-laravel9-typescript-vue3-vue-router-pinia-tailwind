<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Image;

class ImageController extends Controller
{
    public function index()
    {
        $images = Image::latest()->get();

        return Inertia::render('Image/Index', ['images' => $images]);
    }

    public function create()
    {
        return Inertia::render('Image/Create');
    }

    public function store(StoreImage $request)
    {

        $image_path = '';

        if ($request->hasFile('image')) {
            $image_path = $request->file('image')->store('image', 'public');
        }

        $data = Image::create([
            'image' => $image_path,
        ]);

        return Redirect::route('image.index');
    }
}
