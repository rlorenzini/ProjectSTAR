# ProjectSTAR
Digital Crafts group project with Steve, Tiffany, Audi, and Richard.
******************************************************************************************************************************
ProjectSTAR will be a local news blog, with local news and weather imported to the website. Users will be able to sign up to the website and create basic text posts, but also be able to search and view other user's posts.
******************************************************************************************************************************
Master branch is only for finished and fully functional code. Task branches are what we will be pushing to as we work on new features, styling, and more. Until we are ready to merge codes, we each have our own branches to commit our work to; we will test the codes before committing to master branch.

If git push origin yourBranch is running into issues, <b>DO NOT DO git F push!</b> You may completely overwrite or delete the master branch by accident, <b>including this ReadMe file!</b>

Go to the github.com website, go to your branch, and manually select the files to commit. It may be a little extra work, but it will overshadow the immense work we will lose if we accidentally delete everyone's work. You can also copy your work file to a new directory, pull your repository into your working directory, and replace the old file with your new file. Then, try to use git push again.
******************************************************************************************************************************
# Using GitHub
When working in a group environment, it is important to create new branches for specific tasks. If a project member is specifically creating a login page, create a branch for just the login. That way, the main branch, defaulted as master branch, will not be affected by the incomplete code from the login page.

You can also create a separate branch and set it as the default branch, allowing you to push your completed projects to a testing branch. For example, the master branch will be the fully tested and completed code, while your testing branch will be for beta testing, adding new features, and testing possible conflicts. By doing this on a separate branch, the master branch stays functional and operational. Once your testing is done, pushing the full code from the testing branch to the master branch is easier and will have less conflicts.
******************************************************************************************************************************
# Conflict Resolution
Merge conflicts are extremely common and numerous when working in a team environment. GitHub does not determine which file, or what pieces of which file, will be overwritten or kept. The only way to resolve these merging conflicts is to sit side-by-side, or over chat, with the other project member and go line-by-line in your files. You will have to change the file's coding before pushing it into your testing or master branch. This can be time consuming if you work on big tasks and do not break up tasks into smaller branches.
******************************************************************************************************************************
# Minimizing Conflicts and Issues
By keeping the master branch clean from merge conflicts, when someone starts a new task they can pull from the master branch into their new task branch. This way, they get the full working code from the master branch, but their changes will not affect the master branch or anyone else's coding. This is ideal in small teams, large teams, or even solo projects.
******************************************************************************************************************************
# GitHub Terminal Commands
Using your terminal, get into your work directory. Use <b>git init</b> to initialize the branch, and <b>git remote add origin url</b> to tell GitHub which repositiory your working directory will be associated with.

<b>git status</b> checks which branch you are in, if there are files that have been modified, or if the parent branch has changes you have not accepted yet.

<b>git checkout -b childBranch parentBranch</b> is used to create a new branch (child branch) off of an existing branch (parent branch). <b>git checkout -b css-styling master</b> will create a branch called "css-styling" off of the master branch.

<b>get add .</b> adds files to be watched by your repository. <b>add .</b> is used to add all files, whereas <b>add fileName</b> can be used to only add a particular file or files.

<b>git commit -m "message here"</b> must be used before git push. GitHub expects a message with anything you are pushing to the repository. The message should be related to what you worked on, completed, etc.

<b>git push origin branchName</b> is how you push files from your local working directory onto a GitHub repository. <b>NOTE:</b> the branch name you enter is where your changes go. If you accidentally type in master, it will overwrite all of master branch's files. <b>DO NOT use git push -f origin branchName</b> without being absolutely certain your push is going to the branch you want to edit.

<b>git checkout branchName</b> allows you to change branches freely. The branch must exist to change to it; otherwise, use <b>git checkout -b childBranch parentBranch</b> to create the new branch and automatically switch to it. Once you switch to a branch, you are able to do many new things, such as pulling from another branch and merging into a branch.

<b>git merge branchName</b> is used to merge files from another branch. <b>NOTE:</b> whichever branch you are currently working inside of is the branch which will receive the files from the mergin. The branchName is the branch you want to pull files from.

<b>git diff sourceBranch targetBranch</b> is used to check differences in your files. For example,

<b>git pull</b> is used to receive files from the parent branch. Use <b>git status</b> to check for any available updates.

<b>git branch -d targetBranch</b> is used to delete a branch. Once you have merged your changes to the master branch and no longer need the target branch, use <b>git checkout</b> to leave the branch and <b>git branch -d to delete</b> the branch. targetBranch is the name of the branch to be deleted.
******************************************************************************************************************************
A good resource to check out when learning GitHub is "http://rogerdudler.github.io/git-guide/".

To use Sweet Alert, check out "https://sweetalert.js.org/guides/".

For jQuery, go to "https://jquery.com/download/".
