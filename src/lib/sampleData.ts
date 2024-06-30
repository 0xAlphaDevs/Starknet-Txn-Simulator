export const sampleContractAddress =
  "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8";

// traceData.js
export const traceData = {
  contractAddress:
    "0x36b0fe7c0f3fb63184ab34de7992395dbc22d6ee711c29ebf3e33714f4393b9",
  functionName: "__execute__",
  callType: "CALL",
  inputs: [
    {
      name: "calls",
      type: "core::array::Array::<core::starknet::account::Call>",
      value: [
        [
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
            value: [
              "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
            ],
          },
          {
            name: "selector",
            type: "core::felt252",
            value: [
              "0x35a73cd311a05d46deda634c5ee045db92f811b4e74bca4437fcb5302b7af33",
            ],
          },
          {
            name: "calldata",
            type: "core::array::Array::<core::felt252>",
            value: ["0x1"],
          },
        ],
      ],
    },
  ],
  outputs: [
    {
      type: "core::array::Array::<core::array::Span::<core::felt252>>",
      value: [
        [
          {
            name: "snapshot",
            type: "@core::array::Array::<core::felt252>",
            value: ["0x2"],
          },
        ],
      ],
    },
  ],
  internal_calls: [
    {
      contractAddress:
        "0x53c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
      functionName: "balance_of",
      callType: "CALL",
      inputs: [
        {
          name: "account",
          type: "core::starknet::contract_address::ContractAddress",
          value: [
            "0x26dd62b928c8cbbac8639323678ab1332a3a905960130db19435c2e6901190d",
          ],
        },
      ],
      outputs: [
        {
          type: "core::integer::u256",
          value: [821782],
        },
      ],
      internal_calls: [],
    },
  ],
};
