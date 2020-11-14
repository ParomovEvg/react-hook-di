import {ReactiveInstanceFactory, UpdateInstance} from "../../Provider/Provider";
import {InstanceBox} from "../../IocContainer/InstanceBox";
import {InjectionToken} from "../..";
import {ResultBox} from "value-box-ts";
import {InstancesContainer} from "../../IocContainer/IoCContainer.interface";
import {useEffect} from "react";

export class TestProvider implements ReactiveInstanceFactory {
    private readonly result: InstanceBox;

    constructor(private token: InjectionToken) {
        this.result = ResultBox.of(this.token);
    }

    useInstanceFactory(_: InstancesContainer, updateInstance: UpdateInstance): void {
        useEffect(() => {
            updateInstance(this.token, this.result);
        }, []);
    }
}