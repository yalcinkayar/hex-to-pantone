<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HexAndPantone extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'color_name', 'hex', 'red', 'green', 'blue'];
    public $timestamps = false;
}
