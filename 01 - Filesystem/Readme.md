> **File System:**
> 
> Explain the data structures and algorithms that you would use to design an in-memory file system (Similar to *nix
> systems). Illustrate with an example in code where possible. (Please clearly show where you are using "Design Patterns"
> in your answer).

# Filesystem

Files and directories have many features in common, therefore they can inherit from the same `Item` class, 
which will define the common methods and attributes. `Item` is defied as abstract class, so that only `Files` and `Dir`
objects can be instantiated.

The `FileIndex` class implements the file structure (likely a tree) allowing to quickly find, add and remove `Item`s to
the system.

The `PermissionManager` class handles the logic allowing `User`s to access and modify `Item`s. We keep that logic
separate, so it can be modified independently.

The `FileManager` class allows the current `User` to perform common actions on/with Filesystem's
`Item`s. It also manages the `FileIndex` making sure its content remains up-to-date.


# S.O.L.I.D.

Classes should do (almost exclusively) one thing,
and you should extend them instead of modifying them when adding new features.
This allows to transparently replace instances of subclasses of a same parent
class without breaking effects.

The above can be reached by defining interface contracts; however no class
should implement any interface that it doesn't use.

A SOLID design should define classes based on interfaces in order to allow component decoupling,
facilitating composition among system blocks, reusability and testability.
