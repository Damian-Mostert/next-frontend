import { Input } from "sublime-components";
import { Prop } from "./lib/Prop";
import { Title } from "sublime-components";
import Table from "../../../archive/dashboard/components/table";
import { Viewer } from "../../../archive/dashboard/viewer";
import { Popups } from "../../../@application/dashboard/popups";
import { Button } from "sublime-components";

export class HasOne extends Prop {
  constructor(title, key, model) {
    super(key);
    this.key = key;
    this.model = model;
    this.title = title;
    return this;
  }

  outside = true;

  dont_show_at_view = true;

  view = () => {};

  edit = (value, update) => {};
  detail = async (input) => {
    const data = await this.model
      .model()
      .where(this.key, "==", input.id)
      .first();

    console.log("h-one", this.model.model, this.key, input, data);
    return (
      <div className="w-full mt-4">
        <Title align="left" text={this.title} />
        {data && (<>
                  <div className="w-full h-full flex flex-wrap justify-end">
                  <Button
                    label={"Details"}
                    href={"/dashboard/detail/" + this.model.title + "/" + data.id}
                  />
                  <Button
                    className={"ml-4"}
                    label={"Edit"}
                    href={"/dashboard/update/" + this.model.title + "/" + data.id}
                  />
                  <Button
                    className={"ml-4"}
                    label={"Delete"}
                    href={"/dashboard/delete/" + this.model.title + "/" + data.id}
                  />
                </div>
          <Viewer
            params={{ slug: this.model.title }}
            //preview={this.model.preview(data)}
            data={data}
            fields={this.model.fields({}, data)}
          />
        </>)}
        {!data && (
          <div className="w-full h-full flex flex-wrap">
            <div className="w-full text-2xl">No content</div>
            <Button
              label={"Create one"}
              href={"/dashboard/create/" + this.model.title}
            />
          </div>
        )}
      </div>
    );
  };
}
