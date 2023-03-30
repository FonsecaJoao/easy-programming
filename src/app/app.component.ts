import { AfterViewInit, Component } from "@angular/core";

declare var pyscript: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit {
  some = 'for i in range(8):\n\t\tprint(i)';

  ngAfterViewInit(): void {
    const a = document.getElementsByClassName("py-terminal");
    console.log(a);
    console.log(pyscript.interpreter);
    console.log(pyscript.runtime.stdio._listeners[0]);
  }

  sortInPython(data: any) {
    console.log(data);

    // js_sorted = pyscript.interpreter.globals.get('sorted') //grab python's 'sorted' function
    // const sorted_data = js_sorted(data) //apply the function to the 'data' argument
    // for (const item of sorted_data){
    //     console.log(item)
    // }
  }
}
