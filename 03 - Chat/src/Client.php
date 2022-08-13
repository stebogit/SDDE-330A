<?php

namespace Chat;

abstract class Client implements ClientInterface
{
    private User $user;
    private ChatRoom $currentChatRoom;
    private array $recentMessages;
}
