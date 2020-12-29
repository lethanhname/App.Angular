# mklink bin directory for development
```
    mklink /J "app\bin" "App.Angular\bin"
```
[The Complete Guide to Creating Symbolic Links](https://www.howtogeek.com/howto/16226/complete-guide-to-symbolic-links-symlinks-on-windows-or-linux/)
# Angular command
1. Common
```
ng new blog
ng g m users :Generate module
ng g c users/components/login spec=false --s :Generate login component into user module and put it to component folder and skip test and css file
ng g directive customDirective :Generate directive
ng g service users spec=false :Generate user service
ng g cl shared/payment-detail --type=model :Generate model
ng g m app-routing --flat --module=app :Generate Routing module
ng g e common/enums/control-type :Generate enum
ng g i common/interfaces/form :Generate interface
ng update @angular/cli @angluar/core :Upgrade angular to new version
```
2. Library
```
ng generate library app-controls
ng build app-controls
ng build app-controls --watch
ng test app-controls
ng add @angular/material
```

3. Install Highcharts
```
npm i highcharts --save
npm i angular-gridster2 --save
npm i angular-highcharts --save
npm i @ngxd/core --save
```

```
<ng-container *ngxComponentOutlet="components[item.id]"></ng-container>
import { NgxdModule } from '@ngxd/core';
```

# Ensure GitHub NuGet Source

```
    dotnet nuget add source ${{ env.NUGET_URL }} \
    -n github \
    -u ${{ env.GITHUB_USER }} \
    -p ${{ env.GITHUB_TOKEN }} \
    --store-password-in-clear-text
```

# Tools
**dotnet-sdk-3.1.3-win-x64
```
dotnet tool install --global dotnet-ef --version 3.1.3

dotnet ef migrations add Init --context AppDbContext --output-dir Migrations
dotnet ef database update

dotnet ef dbcontext list
dotnet ef migrations remove --context AppDbContext 
```
# VSCode setting 
```
{
    "editor.renderWhitespace": "all",
    "explorer.confirmDelete": false,
    "window.menuBarVisibility": "default",
    "explorer.confirmDragAndDrop": false,
    "editor.renderIndentGuides": true,
    "editor.tabSize": 4,
    "editor.insertSpaces": true,
    "editor.detectIndentation": false
}
```
