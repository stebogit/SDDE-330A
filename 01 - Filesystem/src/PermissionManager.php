<?php

namespace FileSystem;

final class PermissionManager
{
    public static function userCanAccess(User $user, Item|string $url): bool
    {
        // check $user's permissions against $item's $owner
    }

    public static function userCanModify(User $user, Item $item): bool
    {
        // check $user's permissions against $item's $owner
    }
}
