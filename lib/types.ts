export type GPT3Data = {
  id: string;
  object: string;
  created: number;
  model: string;
  error?: string;
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  };
  choices: {
    text: string;
    index: number;
    logprobs: any;
    finish_reason: string;
  }[];
};

export type GPT4Data = {
  id: string;
  object: string;
  created: number;
  model: string;
  error?: string;
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  };
  choices: {
    index: number;
    // logprobs: any;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
};

export type FrontSearchMessagesReturn = {
  _pagination: {
    next: string;
  };
  _links: {
    self: string;
  };
  _results: [
    {
      _links: {
        self: string;
        related: {
          conversation: string;
          message_replied_to: string;
          message_seen: string;
        };
      };
      id: string;
      type: "email" | "custom"; // "custom"
      is_inbound: boolean;
      draft_mode:
        | "shared"
        | "private"
        | "draft"
        | "sent"
        | "unsent"
        | "failed"
        | null;
      error_type: string;
      version: string;
      created_at: number;
      subject: string;
      blurb: string;
      author?: {
        _links: {
          self: string;
          related: {
            inboxes: string;
            conversations: string;
          };
        };
        id: string;
        email: string;
        username: string;
        first_name: string;
        last_name: string;
        is_admin: boolean;
        is_available: boolean;
        is_blocked: boolean;
      };
      recipients: [
        {
          _links: {
            related: {
              contact: string;
            };
          };
          name: string;
          handle: string;
          role: "from" | "to" | "cc" | "bcc";
        }
      ];
      body: string;
      text: string;
      attachments: [
        {
          id: string;
          filename: string;
          url: string;
          content_type: string;
          size: number;
          metadata: {
            is_inline: boolean;
            cid: string;
          };
        }
      ];
      signature: {
        _links: {
          self: string;
          related: {
            owner: string;
          };
        };
        id: string; // "sig_123"
        name: string;
        body: string;
        sender_info: string;
        is_visible_for_all_teammate_channels: boolean;
        is_default: boolean;
        channel_ids: [string];
      };
      metadata: {
        intercom_url: string;
        duration: number;
        have_been_answered: boolean;
        external_id: string;
        twitter_url: string;
        is_retweet: boolean;
        have_been_retweeted: boolean;
        have_been_favorited: boolean;
        thread_ref: string;
        headers: {};
        chat_visitor_url: string;
      };
    }
  ];
};

export type FrontSearchCommentsReturn = {
  _links: {
    self: string;
  };
  _results: [
    {
      _links: {
        self: string;
        related: {
          conversations: string;
          mentions: string;
        };
      };
      id: string;
      author: {
        _links: {
          self: string;
          related: {
            inboxes: string;
            conversations: string;
          };
        };
        id: string;
        email: string;
        username: string;
        first_name: string;
        last_name: string;
        is_admin: boolean;
        is_available: boolean;
        is_blocked: boolean;
      };
      body: string;
      posted_at: number;
      attachments: [
        {
          id: string;
          filename: string;
          url: string;
          content_type: string;
          size: number;
          metadata: {
            is_inline: boolean;
            cid: string;
          };
        }
      ];
    }
  ];
};

export type FrontWebhookPayload = FrontUnknowWebhookPayload | FrontComment;

export type FrontUnknowWebhookPayload = {
  _links: {
    self: string;
  };
  id: string;
  type: "unknown";
};

export type FrontComment = {
  _links: {
    self: string;
  };
  id: string;
  type: "comment";
  emitted_at: number;
  conversation: {
    _links: {
      self: string;
      related: object;
    };
    id: string;
    subject: string;
    status: string;
    assignee: {
      _links: {
        self: "string";
        related: {
          inboxes: "string";
          conversations: "string";
        };
      };
      id: "string";
      email: "string";
      username: "string";
      first_name: "string";
      last_name: "string";
      is_admin: true;
      is_available: true;
      is_blocked: true;
    };
    recipient: {
      _links: object;
      name: string;
      handle: string;
      role: string;
    };
    tags: {
      _links: {
        self: string;
        related: {
          conversations: string;
          owner: string;
        };
      };
      id: string;
      name: string;
      highlight?: string;
      is_private: boolean;
      is_visible_in_conversation_lists: boolean;
      updated_at: number;
      created_at: number;
    }[];
    links: any[];
    created_at: number;
    is_private: boolean;
    scheduled_reminders: any[];
    metadata: object;
  };
  source: {
    _meta: { type: string };
    data: {
      _links: object;
      id: string;
      email: string;
      username: string;
      first_name: string;
      last_name: string;
      is_admin: boolean;
      is_available: boolean;
      is_blocked: boolean;
      custom_fields: object;
    };
  };
  target: {
    _meta: { type: string };
    data: {
      _links: object;
      id: string;
      body: string;
      posted_at: number;
      author: object;
      attachments: any[];
    };
  };
};
