<?php

namespace Chat;

class ChatRoomManager
{
    public function getChatRoomList(): array
    {
    }

    public function getChatRoom(string $room_id): ?ChatRoom
    {
    }

    public function createChatRoom(string $name, User $host): ChatRoom
    {
    }

    public function deleteChatRoom(string $room_id): void
    {
    }

    public function setChatRoomActive(string $room_id)
    {
    }

    public function setChatRoomInactive(string $room_id)
    {
    }

    public function addUserToChatRoom(string $room_id, User $user)
    {
    }

    public function removeUserFromChatRoom(string $room_id, User $user)
    {
    }
}
