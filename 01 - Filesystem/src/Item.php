<?php

namespace FileSystem;

abstract class Item
{
    protected string $name;
    protected User $owner;
    protected string $path;
    protected DateTime $created_at;

    public function __construct(User $owner, string $path, string $name)
    {
        $this->path = $path;
        $this->owner = $owner;
        $this->setCreatedAt();
    }

    abstract public function getSize(): float;

    protected function setCreatedAt(): void
    {
        $this->created_at = new DateTime('NOW');
    }

    public function getCreatedAt(): DateTime
    {
        return $this->created_at;
    }

    public function getOwner(): User
    {
        return $this->owner;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(User $user, string $name): void
    {
        if (!PermissionManager::userCanModify($user, $this)) {
            throw new Exeption('Permission denied');
        }
        $this->name = $name;
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function setPath(User $user, string $path): void
    {
        if (!PermissionManager::userCanModify($user, $this)) {
            throw new Exeption('Permission denied');
        }
        $this->path = $path;
    }

    public function getParentPath(): string
    {
        return dirname($this->path);
    }
}
