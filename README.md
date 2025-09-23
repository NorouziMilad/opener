# opener_cli (for linux)

## A simple tool for managing dev-porjects by code-editors .

### How does it work

- This program depends on projects that already exist, and you need to give the opener_cli the name of your project (folder) so that it can search the HOME path and save it to itself.

- After introducing the project to the opener_cli, if a code-editor (such as VScode) is installed on your system, it will display it to you and after selecting that project, it will open with that code-editor.

- When you first open a project with a code-editor, this code-editor is registered for that project and you do not have to select the code-editor for subsequent times.

## Installation

### To install

```bash
curl -sSL https://raw.githubusercontent.com/NorouziMilad/opener/master/install.sh | bash
```

## Main Command (opener)

### To add a project (aap sub-command)

```bash
opener aap
```

### To delete one project (dop sub-command)

```bash
opener dop
```

### To delete all project (dap sub-command)

```bash
opener dap
```

### To list all porjects (lap sub-command)

```bash
opener lap
```

## Short command (o-)

### To quick open a project

```bash
o- project-name
# The project must have already been added to the opener tool by "opener aap" command
```

## Notes

### To remove the opener_cli tool .

```bash
opener un
```
