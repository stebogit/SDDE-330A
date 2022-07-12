<?php

namespace FileSystem;

class File extends Item
{
    protected Blob $data;

    public function __construct(User $owner, string $path, string $name, Blob $data)
    {
        parent::__construct($owner, $path, $name);
        $this->data = $data;
    }

    public function getSize(): float
    {
        // return calculated size for $this->data
    }

    public function getExtension(): string
    {
        return end(explode('.', $this->name));
    }

    public function write(User $user, Blob $blob): void
    {
        if (!PermissionManager::userCanModify($user, $this)) {
            throw new Exeption('Permission denied');
        }
        $this->data = $blob;
    }

    public function read(User $user): Blob
    {
        if (!PermissionManager::userCanAccess($user, $this)) {
            throw new Exeption('Permission denied');
        }
        return $this->data;
    }
}
