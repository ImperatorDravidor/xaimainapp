// Cleanup script to remove duplicate directories
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const appDir = path.join(__dirname, 'app');

// List of directories that should be removed from the root (they've been moved to category folders)
const directoriesToRemove = [
  'overview',
  'dashboard', 
  'launch-pad',
  'teams'
];

// Remove each directory
directoriesToRemove.forEach(dir => {
  const dirPath = path.join(appDir, dir);
  
  try {
    if (fs.existsSync(dirPath)) {
      console.log(`Removing ${dirPath}...`);
      
      // Use Windows command to remove directory
      execSync(`rmdir /s /q "${dirPath}"`, { stdio: 'inherit' });
      console.log(`Successfully removed ${dirPath}`);
    }
  } catch (err) {
    console.error(`Error removing ${dirPath}:`, err);
  }
});

console.log('Cleanup complete!'); 