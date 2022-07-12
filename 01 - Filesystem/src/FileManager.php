<?php

namespace FileSystem;

class FileManager
{
    protected User $user;
    protected FileIndex $index;

    public function __construct(User $user)
    {
        $this->user = $user;
        $this->index = new FileIndex();
        $this->index->buildIndex();
    }

    public function createFile(string $path, string $name, Blob $content): File
    {
        if ($this->index->find("$path/$name")) {
            throw new Exeption('File already exists');
        }
        $file = new File($this->user, $path, $name, $content);
        $this->index->find($path)->addElement($this->user, $file);
        $this->index->add($path, $file);
        return $file;
    }

    public function createDir(string $path, string $name): Dir
    {
        if ($this->index->find("$path/$name")) {
            throw new Exeption('Directory already exists');
        }
        $dir = new Dir($this->user, $path, $name);
        $this->index->find($path)->addElement($this->user, $dir);
        $this->index->add($path, $dir);
        return $dir;
    }

    public function duplicate(Item $item, string $newName = null): Item
    {
        $path = $item->getPath();
        $name = $newName ?? $item->getName() . ' copy';
        if (get_class($item) === File::class) {
            return $this->createFile($path, $name, $item->read($this->user));
        }
        return $this->createDir($path, $name);
    }

    public function rename(Item $item, string $newName): Item
    {
        $parentDir = $this->index->find($item->getParentPath());
        $parentDir->removeElement($this->user, $item);
        $item->setName($this->user, $newName);
        $parentDir->addElement($this->user, $item);
        return $item;
    }

    public function delete(Item $item): void
    {
        $path = $item->getParentPath();
        $parentDir = $this->index->find($path);
        $parentDir->removeElement($this->user, $item);
        $this->index->remove($path);
    }

    public function move(Item $item, string $newPath): Item
    {
        // remove refs to old dir
        $path = $item->getParentPath();
        $this->index->find($path)->removeElement($this->user, $item);
        $this->index->remove($path);
        // add item to new dir
        $item->setPath($this->user, $newPath);
        $this->index->add($newPath, $item);
        $this->index->find($newPath)->addElement($this->user, $item);
        return $item;
    }
}
