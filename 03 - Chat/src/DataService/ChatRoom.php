<?php

namespace Chat;

class ChatRoom
{
    public string $name;
    public User $host;
    public array $users;
    public string $capacity;
    public string $status;

    public function __construct(string $name, User $host, int $capacity)
    {
    }

    public function setStatus(string $status)
    {
    }

    public function addUser(User $user)
    {
    }

    public function removeUser(User $user)
    {
    }
}
