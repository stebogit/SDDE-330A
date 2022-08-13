<?php

namespace Chat;

class Message
{
    public string $body_text;
    public User|null $recipient;
    public string $visibility;
    public \DateTime $timestamp;
    public ChatRoom $chatroom;

    public function __construct(string $body, ChatRoom $chatroom, ?User $recipient, string $visibility = 'public')
    {
    }
}
