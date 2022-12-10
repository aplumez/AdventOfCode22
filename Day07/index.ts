// Import
import input from './input';

interface IFile {
  name: string;
  size: number;
}

interface INode {
  directory: string;
  subDirectories: INode[];
  files: IFile[];
}

const directoriesTree = input.split('\n').reduce(
  (acc, cmd) => {
    if (cmd.startsWith('$ ls')) {
      return acc;
    }

    if (cmd.startsWith('$ cd')) {
      const path = cmd.replace('$ cd ', '');

      path === '..' ? acc.currentPath.pop() : acc.currentPath.push(path);
      return acc;
    }

    const currentNode = acc.currentPath.reduce((node, path) => {
      if (node.directory === path) {
        return node;
      }

      for (let subDir of node.subDirectories) {
        if (subDir.directory === path) {
          return subDir;
        }
      }

      throw new Error('Directory not found: ' + path);
    }, acc.tree);

    if (cmd.startsWith('dir ')) {
      const dirName = cmd.replace('dir ', '');

      currentNode.subDirectories.push({
        directory: dirName,
        files: [],
        subDirectories: [],
      });

      return acc;
    }

    const [fileSize, fileName] = cmd.split(' ');

    currentNode.files.push({
      name: fileName,
      size: Number(fileSize),
    });

    return acc;
  },
  {
    tree: { directory: '/', subDirectories: [], files: [] },
    currentPath: [],
  } as { tree: INode; currentPath: string[] }
);

const getAllDirectoriesSizes = (directory: INode): number[] => {
  const currentDirSize = directory.files.reduce((acc, e) => acc + e.size, 0);

  const subDirSizes = directory.subDirectories.reduce((sizes, subDir) => {
    return sizes.concat(getAllDirectoriesSizes(subDir));
  }, []);

  const currentDirTotalSize =
    currentDirSize + subDirSizes.reduce((acc, e) => acc + e, 0);

  return [currentDirTotalSize, ...subDirSizes.flat()];
};

const solution1 = getAllDirectoriesSizes(directoriesTree.tree)
  .filter((x) => x <= 100000)
  .reduce((acc, e) => acc + e); // 1232307

const getDirectoryTotalSize = (directory: INode) => {
  const currentDirSize = directory.files.reduce((acc, e) => acc + e.size, 0);

  const subDirsSize = directory.subDirectories
    .reduce((acc, e) => {
      acc.push(getDirectoryTotalSize(e));
      return acc;
    }, [])
    .reduce((acc, e) => acc + e, 0);

  return currentDirSize + subDirsSize;
};

const getAllDirectoriesTotalSizes = (directory: INode): number[] => {
  const subDirectoriesSizes = directory.subDirectories
    .map((subDir) => {
      return getAllDirectoriesTotalSizes(subDir).flat();
    })
    .flat();

  return [getDirectoryTotalSize(directory), ...subDirectoriesSizes];
};

const currentFreeSpace = 70000000 - getDirectoryTotalSize(directoriesTree.tree);

const spaceToFree = 30000000 - currentFreeSpace;

let solution2 = getAllDirectoriesTotalSizes(directoriesTree.tree)
  .filter((x) => x >= spaceToFree)
  .sort((a, z) => z - a)
  .pop();

export default {
  solution1,
  solution2,
};
