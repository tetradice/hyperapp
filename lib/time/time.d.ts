export declare function interval<S extends hyperappSubset.AnyState>(action: hyperappSubset.Dispatchable<S, number>, props: { delay: number }): hyperappSubset.Subscription<S>;

export declare function timeout<S extends hyperappSubset.AnyState>(action: hyperappSubset.Dispatchable<S>, props: { delay: number }): hyperappSubset.Effect<S>;

declare namespace hyperappSubset {
    type AnyState = boolean | string | number | object | symbol | null | undefined;

    type PayloadCreator<DPayload, CPayload> = ((data: DPayload) => CPayload);

    type Dispatchable<State extends AnyState, DPayload = void, CPayload = any> = (
        State
        | [State, ...Effect<State>[]]
        | ([Action<State, CPayload>, PayloadCreator<DPayload, CPayload>])
        | ([Action<State, CPayload>, CPayload])
        | Action<State, void>      // (state) => ({ ... }) | (state) => ([{ ... }, effect1, ...])
        | Action<State, DPayload>  // (state, data) => ({ ... })  | (state, data) => ([{ ... }, effect1, ...])
    );

    type Dispatch<State extends AnyState, NextPayload> = (obj: Dispatchable<State, NextPayload>, data: NextPayload) => State;

    interface EffectRunner<State extends AnyState = AnyState, NextPayload = void, Props = void> {
        (dispatch: Dispatch<State, NextPayload>, props: Props): void;
    }
    
    type Effect<State extends AnyState = AnyState> = [EffectRunner<State, any, any>, any] | [EffectRunner<State, any, void>];

    interface SubscriptionRunner<State extends AnyState = AnyState, NextPayload = void, Props = void> {
        (dispatch: Dispatch<State, NextPayload>, props: Props): (() => void);
    }
    
    type Subscription<State extends AnyState = AnyState> = [SubscriptionRunner<State, any, any>, any] | [SubscriptionRunner<State, any, void>];

    interface Action<State extends AnyState, Payload = void> {
        (state: State, data: Payload): Dispatchable<State>;
    }
}