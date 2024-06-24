<?php

namespace App\Models\CommonArea;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DisableReasonCommonArea extends Model
{
    use HasFactory;
    protected $fillable = [
        "id", "id_common_area", "reason", "active"
    ];

    public function commonArea() {
        return $this->belongsTo(CommonArea::class, "id_common_area");
    }
}
