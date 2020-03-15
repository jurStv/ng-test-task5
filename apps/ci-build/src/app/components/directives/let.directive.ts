import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

interface LetContext<T> {
  ciBuildLet: T;
}

@Directive({
  selector: '[ciBuildLet]'
})
export class LetDirective<T> {
  private _context: LetContext<T> = { ciBuildLet: null };

  constructor(_viewContainer: ViewContainerRef, _templateRef: TemplateRef<LetContext<T>>) {
      _viewContainer.createEmbeddedView(_templateRef, this._context);
  }

  @Input()
  set ciBuildLet(value: T) {
      this._context.ciBuildLet = value;
  }
}
