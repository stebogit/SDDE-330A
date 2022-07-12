<?php

namespace FileSystem;

class Dir extends Item
{
    /** @var Item[] */
    protected array $content = []; // list of items in the directory

    public function getSize(): float
    {
        $size = 0;
        foreach ($this->content as $item) {
            $size += $item->getSize();
        }
        return $size;
    }

    public function getContent(User $user): array
    {
        if (!PermissionManager::userCanAccess($user, $this)) {
            throw new Exception('Permission denied');
        }
        return $this->content;
    }

    public function addElement(User $user, Item $item): void
    {
        if (!PermissionManager::userCanModify($user, $this)) {
            throw new Exeption('Permission denied');
        }
        $this->content[$item->getName()] = $item;
    }

    public function removeElement(User $user, Item $item): void
    {
        if (!PermissionManager::userCanModify($user, $this)) {
            throw new Exeption('Permission denied');
        }
        unset($this->content[$item->getName()]);
    }
}
