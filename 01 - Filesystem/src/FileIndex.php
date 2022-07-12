<?php

namespace FileSystem;

final class FileIndex
{
    private array $index; // hash table or a tree containing file paths

    public function buildIndex(): void
    {
        // crete an index
    }

    public function find(string $path): Item|File|Dir
    {
        // returns the item at $path, like return $this->index[$path];
    }

    public function add(string $path, Item $item): void
    {
        // add $item to the index at $path
    }

    public function remove(string $path): void
    {
        // remove item at $path from global index
    }
}
