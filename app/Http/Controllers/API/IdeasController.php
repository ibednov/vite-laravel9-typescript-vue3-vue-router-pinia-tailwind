<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ideas;
use Illuminate\Http\Request;

class IdeasController extends Controller
{
    // all ideas
    public function index()
    {
        $idea = Ideas::all()->toArray();
        return array_reverse($idea);
    }

    // add idea
    public function add(Request $request)
    {
        $idea = new Ideas([
            'stringId' => $request->stringId,
            'theme' => $request->theme,
            'desc' => $request->desc,
            'status' => $request->status,
            'author' => $request->author,
            'category' => $request->category,
            'likes' => $request->likes,
            'image' => $request->image,
        ]);
        $idea->save();

        return response()->json('The idea successfully added');
    }

    // edit idea
    public function edit($id)
    {
        $idea = Ideas::find($id);
        return response()->json($idea);
    }

    // update idea
    public function update($id, Request $request)
    {
        $idea = Ideas::find($id);
        $idea->update($request->all());

        return response()->json('The idea successfully updated');
    }

    // delete idea
    public function delete($id)
    {
        $idea = Ideas::find($id);
        $idea->delete();

        return response()->json('The idea successfully deleted');
    }
}
