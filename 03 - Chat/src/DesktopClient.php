<?php

namespace Chat;

class DesktopClient extends Client
{
    private User $user;
    private ChatRoom $currentChatRoom;
    private array $recentMessages;

    public function getChatRoomList(): array
    {
        // TODO: Implement getChatRoomList() method.
    }

    public function createChatRoom(User $u, string $name): ChatRoom
    {
        // TODO: Implement createChatRoom() method.
    }

    public function deleteChatRoom(User $u, ChatRoom $cr)
    {
        // TODO: Implement deleteChatRoom() method.
    }

    public function enterChatRoom(User $u, ChatRoom $cr)
    {
        // TODO: Implement enterChatRoom() method.
    }

    public function leaveChatRoom(User $u, ChatRoom $cr): void
    {
        // TODO: Implement leaveChatRoom() method.
    }

    public function sendMessage(Message $m)
    {
        // TODO: Implement sendMessage() method.
    }

    public function editMessage(Message $m, string $token)
    {
        // TODO: Implement editMessage() method.
    }

    public function deleteMessage(Message $m, string $token)
    {
        // TODO: Implement deleteMessage() method.
    }
}
