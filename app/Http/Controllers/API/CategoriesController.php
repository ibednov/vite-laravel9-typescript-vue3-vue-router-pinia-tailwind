<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    // all categories
    public function index()
    {
        $category = Categories::all()->toArray();
        return array_reverse($category);
    }

    // add category
    public function add(Request $request)
    {
        $category = new Categories([
            'name' => $request->name,
            'stringId' => $request->stringId,
            'desc' => $request->desc,
            'isEnabled' => $request->isEnabled,
            'likes' => $request->likes,
            'countIdeas' => $request->countIdeas,

            'image' => $request->image,

        ]);
        $category->save();

        return response()->json('The category successfully added');
    }

    // edit category
    public function edit($id)
    {
        $category = Categories::find($id);
        return response()->json($category);
    }

    // update category
    public function update($id, Request $request)
    {
        $category = Categories::find($id);
        $category->update($request->all());

        return response()->json('The category successfully updated');
    }

    // delete category
    public function delete($id)
    {
        $category = Categories::find($id);
        $category->delete();

        return response()->json('The category successfully deleted');
    }
}
