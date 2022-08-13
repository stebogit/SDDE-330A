<?php

namespace Chat;

class ChatManager
{
    private ChatRoom $chatRoom;

    public function __construct(string $room_id)
    {
        // set $chatRoom
    }

    public function getLatestMessages(User $recipient): array
    {
    }

    public function getUsersList(): array
    {
    }

    public function sendMessageToUser(string $m, User $from, User $to, string $visibility): array
    {
        $from->sendMessage($this->chatRoom, $m, $to, $visibility);
    }

    public function broadCastMessage(string $m, User $from): void
    {
        $from->sendMessage($this->chatRoom, $m, null);
    }
}
