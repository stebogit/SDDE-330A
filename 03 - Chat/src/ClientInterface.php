<?php

namespace Chat;

interface ClientInterface
{
    /** @return ChatRoom[] */
    public function getChatRoomList(): array;

    public function createChatRoom(User $u, string $name): ChatRoom;

    public function deleteChatRoom(User $u, ChatRoom $cr);

    public function enterChatRoom(User $u, ChatRoom $cr);

    public function leaveChatRoom(User $u, ChatRoom $cr): void;

    public function sendMessage(Message $m);

    public function editMessage(Message $m, string $token);

    public function deleteMessage(Message $m, string $token);
}
