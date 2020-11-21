import React from "react";
import {EmptyBox, MaybeBox} from "value-box-ts";
import {InstancesContainer} from "../di-system/IocContainer/IoCContainer.interface";

export const InstancesContainerContext = React.createContext<MaybeBox<InstancesContainer>>(
    EmptyBox.get()
);