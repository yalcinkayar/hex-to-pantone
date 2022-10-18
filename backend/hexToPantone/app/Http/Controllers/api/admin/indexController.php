<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HexAndPantone;

class indexController extends Controller
{
    public function index(){
        $color = HexAndPantone::all();
        return response()->json([
            'success'=>true,
            'data'=>$color
        ]);
    }

    public function create(){
    }

    public function edit(Request $request){
        $data = json_decode($request->getContent());
        $id = $data->id;
         
        $update = HexAndPantone::whereId($id)->update([
            'red' => $data->red,
            'green' => $data->green,
            'blue' => $data->blue,
        ]);
    }

    public function store(Request $request){
        $data = json_decode($request->getContent());

        $create = HexAndPantone::create([
            'color_name' => $data->color_name,
            'hex' => $data->hex,
            'red' => $data->red,
            'green' => $data->green,
            'blue' => $data->blue,
        ]);
        $color = HexAndPantone::where('hex', $hex)->first();
        return response()->json([
            'success'=>true,
            'data'=>$color
        ]);
    }

    public function show($hexCode)
    {
        $hexCode = '#' . $hexCode;
        $color = HexAndPantone::where('hex', $hexCode)->first();

        if($color == ''){
            return response()->json([
                'success'=>false
            ]);
        }else{
            return response()->json([
                'success'=>true,
                'data'=>$color
            ]);
        }
    }
}
