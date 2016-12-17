# bash-repple.js

bash-repple is a customize REPL ( READ EVAL PRINT LOOP ) that supports running of bash history expansion and substitution in node.js. It also supports running builtin commands through node


# How to install

```
   // install it globally
   npm install -g bash-repple
   
```

or

```
  git clone https://github.com/zombieleet/bash-repple.git
  
```
# How to use

runnning command line commands

```
  bash-repple
  > $ls
  file1.txt
  file2.txt
  file3.txt
  directory
  > $whoami
  root
  > $clear  // clears the screen :D
// you can run any number of command line commands. As long as that command is a valid command in your box  
```

history manipulation

```
// you should note that the history will be cleared whenever you close bash-repple
//   this will be fixed in the next release

 bash-repple
  > $ls
  file1.txt
  file2.txt
  > $whoami
  root
  > $!!
  root
  > $ls
  file1.txt
  file2.txt  // i need only long listing
  > $!! -l
  -rw-r--r-- 1 root root file1.txt
  -rw-r--r-- 1 root root file2.txt
  // i want to execute whoami again without typing it
  > $!-4 // whenever you use a minus symbol followed by a number, it goes up to the command located at the number
  root
 
// if you know bash history manipulation this will not be a problem
```

history substitution

```
   bash-repple
   > $la // instead of ls you typed la
   error // more detailed
   > $^a^s
   file1.txt
   file2.txt
   > $!-2 ^a^s // go up history by 2 and replace a with s
   file1.txt
   file2.txt
   // i need a long listing
   > $!! -l
  -rw-r--r-- 1 root root file1.txt
  -rw-r--r-- 1 root root file2.txt
  // i need a short listing of only hidden files
  > $!! ^-l^-a
  .git
  .hidden1
  .hidden2.txt
  .gitignore

```

extra cool

```
  bash-repple
  > $git log --oneline --graphy --decorate --all // take note --graphy is suppose to be --graph
  error // more detailed
  > $git help log | grep --
  error // mistakenly hit enter without escaping the -- and quoting it
  > $^--^'\-\-'
  so many optionssssssss // oh --graph not --graphy
  >$!-3 ^y^  // remove the y
  logsssss
  logssss
  logssss
  
```

redirection

```
   bash-repple
   > $grep "root" < /etc/passwd
   root:x:0:0:root:/root:/bin/bash
   
```


loooooooooooop
```
  bash-repple
  > $for i in `seq 0 10`;do echo $i; done
  0
  1
  2
  3
  4
  5
  6
  7
  8
  9
  10
```


# Bug

1. It does not cd to any directory


# LICENSE
GNU General Public License version 2
