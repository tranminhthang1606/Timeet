<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class Message extends Model implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    public function getJWTIdentifier()
    {
        return "user_id";
    }

    public function getJWTCustomClaims()
    {
        return [];
    }


    protected $fillable = [
        'sent_userId',
        'received_userId',
        'message',
    ];
}