<?php

namespace Chat;

class User
{
    public string $name;
    public string $id;
    public string $status;

    public function sendMessage(ChatRoom $cr, string $m, ?User $to, string $visibility = 'public'): array
    {
        // save new Message
    }
}
